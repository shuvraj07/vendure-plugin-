import { Args, Parent, Query, Resolver, Mutation } from '@nestjs/graphql';
import { FeedbackService } from './feedback.services';
import { RequestContext, Ctx, Transaction } from '@vendure/core';

@Resolver()
export class FeedbackShopResolver {
    constructor(private feedbackService: FeedbackService) {
    }
	
    @Transaction()
	@Mutation()
	addFeedback(@Ctx() ctx: RequestContext, @Args() args: any){
	   const {input} = args;
       console.log("Input",input)
       console.log('RequestContext:', ctx);

        // Log Args
        console.log('Args:', args);
	   return this.feedbackService.addSingleFeedback(ctx,input);
	}
	
}