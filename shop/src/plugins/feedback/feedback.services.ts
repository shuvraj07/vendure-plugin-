import { Injectable, Inject } from '@nestjs/common';
import { DeepPartial, FindOptionsWhere, ObjectID, ObjectLiteral } from 'typeorm';


import { ListQueryBuilder,TransactionalConnection, RequestContext, ID } from '@vendure/core';

import { ListQueryOptions } from '@vendure/core/dist/common/types/common-types';

import { FeedbackEntity } from './feedback.entity';
import { PLUGIN_INIT_OPTIONS } from './constants';
import { PluginInitOptions } from './types';

@Injectable()
export class FeedbackService {

    constructor(private connection: TransactionalConnection,
                @Inject(PLUGIN_INIT_OPTIONS) private options: PluginInitOptions,
				private listQueryBuilder: ListQueryBuilder) {}

    async getAllFeedbacks(ctx:RequestContext,options?: ListQueryOptions<FeedbackEntity>) {
        return this.listQueryBuilder
		.build(FeedbackEntity, options)
		.getManyAndCount()
		.then(([feedbacks, totalItems]) => {
			return {
				items: feedbacks,
				totalItems
			 };
		 });
    }
	
	async getFeedbackById(ctx:RequestContext,data:any){
	   return this.connection.getEntityOrThrow(ctx, FeedbackEntity, data);
	}
	
	// async addSingleFeedback(ctx: RequestContext | undefined,data: DeepPartial<ObjectLiteral>[]):Promise<string>{
	//    const createdVariant = this.connection.getRepository(ctx, FeedbackEntity).create(data);
	//    const savedVariant = await this.connection.getRepository(ctx,FeedbackEntity).save(createdVariant);
    //    console.log(savedVariant)
	//    return "hello this is wokring ";
	// }
    async addSingleFeedback(ctx: RequestContext, data: FeedbackEntity[]): Promise<FeedbackEntity[]> {
        const feedbackRepository = this.connection.getRepository(ctx, FeedbackEntity);

        const createdVariant = feedbackRepository.create(data);
        const savedVariant = await feedbackRepository.save(createdVariant);
        console.log(savedVariant);

        return savedVariant;
    
    }
	
	async updateSingleFeedback(ctx: RequestContext,data: FeedbackEntity){
	   const createdVariant = await this.connection.getRepository(ctx,FeedbackEntity).update(data.id,{
		   name: data.name || "Anonymous",
		   email: data.email || "Anonymous",
		   phone: data.phone || "Anonymous",
		   feedback: data.feedback
	   });
	   return this.connection.getEntityOrThrow(ctx,FeedbackEntity,data.id);
	}
	
	async deleteSingleFeedback(ctx:RequestContext,ids:any){
	   const Variants = await this.connection.getEntityOrThrow(ctx, FeedbackEntity, ids);
	   this.connection.getRepository(ctx,FeedbackEntity).delete(ids);
	   return Variants;
	}
	
	deleteAllFeedbacks(ctx:RequestContext){
	   this.connection.getRepository(ctx,FeedbackEntity).clear();
	   return true;
	}
	
}