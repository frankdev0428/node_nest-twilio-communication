import { JwtService } from '@nestjs/jwt';
import * as _ from "lodash";

export const jwt = new JwtService({
  secret: process.env.SECRET_KEY,
  signOptions: {
    expiresIn: '30d',
    issuer: 'communicate-backend',
  },
});

export const convertToNumber = (str) => {
  return (str || '').replace(/\D/g,'');
}

export const WEBHOOK_URL = `${process.env.APP_URL}/facebook/webhook`;

export const convertDate = (date: string) => {
  const [year, month, day] = date.split('-');
  return new Date(+year, +month - 1, +day);
}

export function getChartData(arr: any[], duration: string) {
  const twoDigit = (s) => `${s}`.padStart(2, '0');
  const fullFormat = (date) => `${date.getFullYear()}/${twoDigit(date.getMonth()+1)}/${twoDigit(date.getDate())}`;
  const monthFormat = (date) => `${date.getFullYear()}/${twoDigit(date.getMonth()+1)}`;
  const yearFormat = (date) => `${date.getFullYear()}`;

  const data = _.groupBy(arr, (a) => {
    if (duration == 'day') {
      return fullFormat(a.createdDate);
    } else if (duration == 'month') {
      return monthFormat(a.createdDate);
    } else if (duration == 'year') {
      return yearFormat(a.createdDate);
    }
  });

  const startDate = new Date();
  const now = new Date();
  const result = {};

  if (duration == 'day') {
    startDate.setMonth(startDate.getMonth() - 1);
    while (startDate.getTime() <= now.getTime()) {
      result[fullFormat(startDate)] = 0;
      startDate.setDate(startDate.getDate() + 1);
    }
  
    for (const key in data) {
      if (result[key] === 0) {
        result[key] = data[key].length;
      }
    }
  } else if (duration == 'month') {
    startDate.setFullYear(startDate.getFullYear() - 1);
    while (startDate.getTime() <= now.getTime()) {
      result[monthFormat(startDate)] = 0;
      startDate.setMonth(startDate.getMonth() + 1);
    }
  
    for (const key in data) {
      if (result[key] === 0) {
        result[key] = data[key].length;
      }
    }
  } else if (duration == 'year') {
    startDate.setFullYear(startDate.getFullYear() - 3);
    while (startDate.getTime() <= now.getTime()) {
      result[yearFormat(startDate)] = 0;
      startDate.setFullYear(startDate.getFullYear() + 1);
    }
  
    for (const key in data) {
      if (result[key] === 0) {
        result[key] = data[key].length;
      }
    }
  }
  return result;
}

export function getChartDataForRange(arr: any[], stDate: Date, edDate: Date, duration: string) {
  const twoDigit = (s) => `${s}`.padStart(2, '0');
  const fullFormat = (date) => `${date.getFullYear()}/${twoDigit(date.getMonth()+1)}/${twoDigit(date.getDate())}`;
  const monthFormat = (date) => `${date.getFullYear()}/${twoDigit(date.getMonth()+1)}`;
  const yearFormat = (date) => `${date.getFullYear()}`;

  const startDate = new Date(stDate);
  const endDate = new Date(edDate);

  const data = _.groupBy(arr, (a) => {
    if (duration == 'day') {
      return fullFormat(a.createdDate);
    } else if (duration == 'month') {
      return monthFormat(a.createdDate);
    } else if (duration == 'year') {
      return yearFormat(a.createdDate);
    }
  });

  // const startDate = new Date();
  // const now = new Date();
  const result = {};

  if (duration == 'day') {
    while (startDate.getTime() <= endDate.getTime()) {
      result[fullFormat(startDate)] = 0;
      startDate.setDate(startDate.getDate() + 1);
    }
  
    for (const key in data) {
      if (result[key] === 0) {
        result[key] = data[key].length;
      }
    }
  } else if (duration == 'month') {
    startDate.setDate(1);
    while (startDate.getTime() <= endDate.getTime()) {
      result[monthFormat(startDate)] = 0;
      startDate.setMonth(startDate.getMonth() + 1);
    }
  
    for (const key in data) {
      if (result[key] === 0) {
        result[key] = data[key].length;
      }
    }
  } else if (duration == 'year') {
    startDate.setMonth(0);
    startDate.setDate(1);
    while (startDate.getTime() <= endDate.getTime()) {
      result[yearFormat(startDate)] = 0;
      startDate.setFullYear(startDate.getFullYear() + 1);
    }
  
    for (const key in data) {
      if (result[key] === 0) {
        result[key] = data[key].length;
      }
    }
  }
  return result;
}

export function makeSubdomain(businessName: string) {
  const subdomain = businessName.toLowerCase().replace(/[, .]+/g, "").trim();

  return subdomain;
}