import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TeamPipe implements PipeTransform {
  transform(value: string) {
    if (value != 'red' && value != 'blue')
      throw new BadRequestException('Team not valid');
    return value;
  }
}
