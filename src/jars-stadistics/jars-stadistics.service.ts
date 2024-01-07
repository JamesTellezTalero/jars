import { Injectable } from '@nestjs/common';
import {
  jarsStadisticsDatesDto,
  jarsStadisticsDto,
  jarsStadisticsResponseDto,
} from './jars-stadistics.dto';
import { UsersService } from 'src/users/users.service';
import { JarsService } from 'src/jars/jars.service';
import { Jars } from 'src/database/entities/Jars';

@Injectable()
export class JarsStadisticsService {
  constructor(
    private readonly JarsS: JarsService,
    private readonly UsersS: UsersService,
  ) {}
  async GetGeneralStadistics(
    dto: jarsStadisticsDto,
  ): Promise<jarsStadisticsResponseDto> {
    let jarsStadisticsResponse = new jarsStadisticsResponseDto();
    jarsStadisticsResponse.balance = 0;
    let user = await this.UsersS.GetByEmailWithJars(dto.jsonWebTokenInfo.email);
    let jarsIds = user.jars.map((e) => e.id);
    let jars = await this.JarsS.GetJarMovementsByIds(jarsIds);
    jarsStadisticsResponse.totalIncomes = await this.GetTotalIncomes(jars);
    jarsStadisticsResponse.totalOutcomes = await this.GetTotalOutcomes(jars);
    jarsStadisticsResponse.balance =
      jarsStadisticsResponse.totalIncomes -
      jarsStadisticsResponse.totalOutcomes;
    return jarsStadisticsResponse;
  }

  async GetGeneralStadisticsByDates(
    dto: jarsStadisticsDatesDto,
  ): Promise<jarsStadisticsResponseDto> {
    let jarsStadisticsResponse = new jarsStadisticsResponseDto();
    jarsStadisticsResponse.balance = 0;
    let user = await this.UsersS.GetByEmailWithJars(dto.jsonWebTokenInfo.email);
    let jarsIds = user.jars.map((e) => e.id);
    let { jarsIncomes, jarsOutcomes } =
      await this.JarsS.GetJarsMovementsByIdsAndDates(
        jarsIds,
        dto.inicio,
        dto.final,
      );
    jarsStadisticsResponse.totalIncomes =
      await this.GetTotalIncomes(jarsIncomes);
    jarsStadisticsResponse.totalOutcomes =
      await this.GetTotalOutcomes(jarsOutcomes);
    jarsStadisticsResponse.balance =
      jarsStadisticsResponse.totalIncomes -
      jarsStadisticsResponse.totalOutcomes;
    return jarsStadisticsResponse;
  }

  async GetTotalIncomes(
    jars: Jars[] | Jars,
    filterJarMovementType = false,
  ): Promise<number> {
    let jarsIncomes = Array.isArray(jars)
      ? jars.map((e) => e.incomeMovements)
      : jars?.incomeMovements;
    if (jarsIncomes == null) {
      return 0;
    }
    let flatJarsIncomes =
      filterJarMovementType == false
        ? jarsIncomes
            .flat()
            .filter((e) => e.movementType.id == 2 || e.movementType.id == 5)
        : jarsIncomes.flat().filter((e) => e.movementType.id == 4);
    let totalIncomes = 0;
    flatJarsIncomes.forEach((e) => {
      totalIncomes += e.amount;
    });
    return totalIncomes;
  }

  async GetTotalOutcomes(
    jars: Jars[] | Jars,
    filterJarMovementType = false,
  ): Promise<number> {
    let jarsOutcomes = Array.isArray(jars)
      ? jars.map((e) => e.outcomeMovements)
      : jars?.outcomeMovements;
    if (jarsOutcomes == null) {
      return 0;
    }
    let flatJarsOutcomes =
      filterJarMovementType == false
        ? jarsOutcomes.flat().filter((e) => e.movementType.id == 3)
        : jarsOutcomes.flat().filter((e) => e.movementType.id == 4);
    let totalOutcomes = 0;
    flatJarsOutcomes.forEach((e) => {
      totalOutcomes += e.amount;
    });
    return totalOutcomes;
  }

  async GetJarStadistics(
    dto: jarsStadisticsDto,
    jarId: number,
  ): Promise<jarsStadisticsResponseDto> {
    let jarsStadisticsResponse = new jarsStadisticsResponseDto();
    jarsStadisticsResponse.balance = 0;
    let user = await this.UsersS.GetByEmailWithJars(dto.jsonWebTokenInfo.email);
    let JarExist = await this.JarsS.ValidateUserPertenency(jarId, user.email);
    let jars = await this.JarsS.GetJarMovementsById(jarId);
    jarsStadisticsResponse.totalIncomes = await this.GetTotalIncomes(jars);
    jarsStadisticsResponse.totalOutcomes = await this.GetTotalOutcomes(jars);

    let jarsSenderMovements = await this.GetTotalIncomes(jars, true);
    let jarsReceiberMovements = await this.GetTotalOutcomes(jars, true);

    jarsStadisticsResponse.totalIncomes =
      jarsStadisticsResponse.totalIncomes + jarsSenderMovements;
    jarsStadisticsResponse.totalOutcomes =
      jarsStadisticsResponse.totalOutcomes + jarsReceiberMovements;

    jarsStadisticsResponse.balance =
      jarsStadisticsResponse.totalIncomes -
      jarsStadisticsResponse.totalOutcomes;
    return jarsStadisticsResponse;
  }

  async GetJarStadisticsByDates(
    dto: jarsStadisticsDatesDto,
    jarId: number,
  ): Promise<jarsStadisticsResponseDto> {
    let jarsStadisticsResponse = new jarsStadisticsResponseDto();
    jarsStadisticsResponse.balance = 0;
    let user = await this.UsersS.GetByEmailWithJars(dto.jsonWebTokenInfo.email);
    let JarExist = await this.JarsS.ValidateUserPertenency(jarId, user.email);
    let { jarsIncomes, jarsOutcomes } =
      await this.JarsS.GetJarMovementsByIdAndDates(
        jarId,
        dto.inicio,
        dto.final,
      );
    jarsStadisticsResponse.totalIncomes =
      await this.GetTotalIncomes(jarsIncomes);
    jarsStadisticsResponse.totalOutcomes =
      await this.GetTotalOutcomes(jarsOutcomes);

    let jarsSenderMovements = await this.GetTotalIncomes(jarsIncomes, true);
    let jarsReceiberMovements = await this.GetTotalOutcomes(jarsOutcomes, true);

    jarsStadisticsResponse.totalIncomes =
      jarsStadisticsResponse.totalIncomes + jarsSenderMovements;
    jarsStadisticsResponse.totalOutcomes =
      jarsStadisticsResponse.totalOutcomes + jarsReceiberMovements;

    jarsStadisticsResponse.balance =
      jarsStadisticsResponse.totalIncomes -
      jarsStadisticsResponse.totalOutcomes;
    return jarsStadisticsResponse;
  }
}
