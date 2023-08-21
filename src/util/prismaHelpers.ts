import { PrismaClient } from "@prisma/client";


export async function getMember( prisma:PrismaClient, id:number ) {
    return await prisma.member.findUnique({
        where: { id }
    })
}

export async function getMembers( prisma:PrismaClient ) {
    return await prisma.member.findMany()
}

export async function createMember( prisma:PrismaClient, name: string ) {
    return await prisma.member.create({
        data: { name }
    })
}

export async function addTeamToMember( prisma:PrismaClient, memberId:number, teamId:number ) {
    return await prisma.footballTeamMember.create({
        data: { memberId, footballTeamId: teamId }
    })
}

export async function getTeams( prisma:PrismaClient ) {
    return await prisma.footballTeam.findMany()
}

export async function getTeam( prisma:PrismaClient, id:number ) {
    return await prisma.footballTeam.findUnique({
        where: { id }
    })
}

export async function createTeam( prisma:PrismaClient, name: string ) {
    return await prisma.footballTeam.create({
        data: { name }
    })
}

export async function getMatches( prisma:PrismaClient ) {
    return await prisma.match.findMany()
}

export async function getMatch( prisma:PrismaClient, id:number ) {
    return await prisma.match.findUnique({
        where: { id }
    })
}

export async function createMatch( prisma:PrismaClient, homeTeamId:number, awayTeamId:number, score:string, date: Date ) {
    return await prisma.match.create({
        data: { footballTeamHomeId: homeTeamId, footballTeamAwayId: awayTeamId, score, date }
    })
}

export async function createFee( prisma:PrismaClient, memberId:number, date:Date, amount:number, description:string ) {
    return await prisma.fee.create({
        data: { memberId, date, amount, description }
    })
}

export async function  createPayment( prisma:PrismaClient, memberId:number, date:Date, amount:number, description:string ) {
    return await prisma.payment.create({
        data: { memberId, date, amount, description }
    })
}