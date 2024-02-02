import { Entity, Column } from 'typeorm';
import { VendureEntity, DeepPartial } from '@vendure/core';
@Entity()
export class FeedbackEntity extends VendureEntity {

    constructor(input?: DeepPartial<FeedbackEntity>) {
        super(input);
    }

    @Column({default:"Anonymous"})
    name: string;
	
	@Column({default:"Anonymous"})
    email: string;
	
	@Column({default:"Anonymous"})
    phone: string;
	
	@Column()
    feedback: string;
}