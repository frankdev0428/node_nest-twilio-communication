import { JwtService } from '@nestjs/jwt';
export declare const jwt: JwtService;
export declare const convertToNumber: (str: any) => any;
export declare const WEBHOOK_URL: string;
export declare const convertDate: (date: string) => Date;
export declare function getChartData(arr: any[], duration: string): {};
export declare function getChartDataForRange(arr: any[], stDate: Date, edDate: Date, duration: string): {};
export declare function makeSubdomain(businessName: string): string;
