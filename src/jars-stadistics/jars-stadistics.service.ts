import { Injectable } from '@nestjs/common';
import {
  jarsStadisticsDto,
  jarsStadisticsResponseDto,
} from './jars-stadistics.dto';
import { UsersService } from 'src/users/users.service';
import { JarsService } from 'src/jars/jars.service';

@Injectable()
export class JarsStadisticsService {
  constructor(
    private readonly JarsS: JarsService,
    private readonly UsersS: UsersService,
  ) {}
  async test(init: jarsStadisticsDto): Promise<jarsStadisticsResponseDto> {
    let jarsStadisticsResponse = new jarsStadisticsResponseDto();
    jarsStadisticsResponse.totalIncomes = 0;
    jarsStadisticsResponse.totalOutcomes = 0;
    jarsStadisticsResponse.balance = 0;
    let user = await this.UsersS.GetByEmailWithJars(
      init.jsonWebTokenInfo.email,
    );
    let jarsIds = user.jars.map((e) => e.id);
    let jars = await this.JarsS.GetJarMovementsByIds(jarsIds);
    let jarsIncomes = jars.map((e) => e.incomeMovements);
    let jarsOutcomes = jars.map((e) => e.outcomeMovements);
    let flatJarsIncomes = jarsIncomes
      .flat()
      .filter((e) => e.movementType.id == 2 || e.movementType.id == 5);
    let flatJarsOutcomes = jarsOutcomes
      .flat()
      .filter((e) => e.movementType.id == 3);

    flatJarsIncomes.forEach((e) => {
      jarsStadisticsResponse.totalIncomes += e.amount;
    });
    flatJarsOutcomes.forEach((e) => {
      jarsStadisticsResponse.totalOutcomes += e.amount;
    });
    jarsStadisticsResponse.balance =
      jarsStadisticsResponse.totalIncomes -
      jarsStadisticsResponse.totalOutcomes;
    return jarsStadisticsResponse;
  }
}
