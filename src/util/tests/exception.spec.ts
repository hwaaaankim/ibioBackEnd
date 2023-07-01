import { HttpException, HttpStatus } from '@nestjs/common';
import { DataNotFoundException } from '../exception/DataNotFoundException';

describe('exception test suite', () => {

  it('check if DataNotFoundException exception works', () => {
    expect(new DataNotFoundException('here')).toEqual(new HttpException('here', HttpStatus.NOT_FOUND))
  })

})