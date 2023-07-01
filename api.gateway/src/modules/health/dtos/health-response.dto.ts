import { ApiProperty } from '@nestjs/swagger';

export class HealthResponse {
  @ApiProperty({
    example: 'OK',
  })
  message: string;
}
