import { Injectable } from '@nestjs/common';
import {
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

  async GetTotalIncomes(jars: Jars[]) {
    let jarsIncomes = jars.map((e) => e.incomeMovements);
    let flatJarsIncomes = jarsIncomes
      .flat()
      .filter((e) => e.movementType.id == 2 || e.movementType.id == 5);

    let totalIncomes = 0;
    flatJarsIncomes.forEach((e) => {
      totalIncomes += e.amount;
    });
    return totalIncomes;
  }

  async GetTotalOutcomes(jars: Jars[]) {
    let jarsOutcomes = jars.map((e) => e.outcomeMovements);
    let flatJarsOutcomes = jarsOutcomes
      .flat()
      .filter((e) => e.movementType.id == 3);
    let totalOutcomes = 0;
    flatJarsOutcomes.forEach((e) => {
      totalOutcomes += e.amount;
    });
    return totalOutcomes;
  }
}
