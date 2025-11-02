import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { API_KEY, CHANNEL_NUMBER, CHANNELS_URL, UPDATE_URL } from './const/week1.const';
import AppLog from '@/logger/app-log.service';

@Injectable()
export class Week1Service {
    constructor() {}

    async sendDataUrlEncoded(field1: number, field2: number) : Promise<any> {
        try {
            const url = `${UPDATE_URL}?api_key=${API_KEY}&field1=${field1}&field2=${field2}`;
            const response = await axios.get(url);
            AppLog.info(`[WEEK 1][GET] URL: ${url}, Response: ${JSON.stringify(response.data)}`);
            return response.data;
        }
        catch (error) {
            AppLog.error('[WEEK 1][ERROR] Error sending data:', error);
        }
    }

    async sendDataJson(field1: number, field2: number) : Promise<any> {
        try {
            const url = `${UPDATE_URL}?api_key=${API_KEY}`;
            const response = await axios.post(url, {
                field1: field1,
                field2: field2 
            });
            AppLog.info(`[WEEK 1][POST] URL: ${url}, Payload: ${JSON.stringify({ field1, field2 })}, Response: ${JSON.stringify(response.data)}`);
            return response.data;
        }
        catch (error) {
            AppLog.error('[WEEK 1][ERROR] Error sending data:', error);
        }
    }

    async getDataFromChannel(feedLength: number, channelId: string = CHANNEL_NUMBER) : Promise<any> {
        try {
            const url = `${CHANNELS_URL}/${channelId}/feeds.json?results=${feedLength}`;
            const response = await axios.get(url);
            const feeds = response.data.feeds;

            AppLog.info(`[WEEK 1][GET] URL: ${url}`);
            for (const item of feeds) {
                AppLog.info(`[WEEK 1][RESPONSE] created_at: ${item.created_at}, entry_id: ${item.entry_id}, field1: ${item.field1}, field2: ${item.field2}`);
            }
            return feeds;
        }
        catch (error) {
            AppLog.error(`[WEEK 1][ERROR] Error getting data from channel ${channelId}:`, error);
        }
    }
}
