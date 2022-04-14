import {prop, getModelForClass, modelOptions} from '@typegoose/typegoose'

@modelOptions({schemaOptions: {
    timestamps: true
}})
class Notification {
    @prop({required: true})
    userId: string

    @prop({required: true})
    guildId: string

    @prop({required: true})
    twitchUsername: string

    @prop({required: true, type: String})
    public twitchUserId: string

    @prop({required: true})
    channel: string

    @prop({required: true})
    channelName: string

    @prop({required: true})
    message: string
}

const notificationModel = getModelForClass(Notification)

export default notificationModel