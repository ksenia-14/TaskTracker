import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';

export function TransformStringToDate() {
  return Transform(({ value }) => {
    if (value === '') {
      return '';
    }
    if (typeof value === 'string' && value !== '') {
      const date = new Date(value);
      if (isNaN(date.getTime()) || date.toISOString().split('T')[0] !== value) {
        throw new BadRequestException('неверный формат даты');
      }
      return date;
    }
    return value;
  });
}