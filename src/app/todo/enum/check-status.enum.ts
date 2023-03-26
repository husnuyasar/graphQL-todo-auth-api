import { registerEnumType } from "@nestjs/graphql";

export enum CheckStatus {
    ALL,
    COMPLETED,
    IMCOMPLETED
}

registerEnumType(CheckStatus, {
    name: 'CheckStatus',
    description: 'Mark Status',
});