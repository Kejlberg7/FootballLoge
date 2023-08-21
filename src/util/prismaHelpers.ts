import { async } from "@angular/core/testing";
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

export async function addTeamToMember( prisma:PrismaClient, memberId:number, teamName:string ) {
    return await prisma.footballTeamMember.create({
        data: { memberId, footballTeamId:teamName }
    })
}

export async function getTeams( prisma:PrismaClient ) {
    return await prisma.footballTeam.findMany()
}

export async function getTeam( prisma:PrismaClient, name:string ) {
    return await prisma.footballTeam.findUnique({
        where: { name }
    })
}

export async function getTeamsByName( prisma:PrismaClient, name:string ) {
    return await prisma.footballTeam.findMany({
        where: { name }
    })
}


export async function createTeam( prisma:PrismaClient, name: string ) {
    return await getTeamsByName(prisma, name).then(teams => {
        if(teams.length == 0) {
            return prisma.footballTeam.create({
                data: { name }
            })
        }
        return;
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

export async function createMatch( prisma:PrismaClient, matchId: number, homeTeamId:string, awayTeamId:string, score:string, date: Date ) {
    return await prisma.match.upsert({
        where: { id: matchId },
        create: { footballTeamHomeId: homeTeamId, footballTeamAwayId: awayTeamId, score, date },
        update: { footballTeamHomeId: homeTeamId, footballTeamAwayId: awayTeamId, score, date }
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

export async function syncMatches( prisma:PrismaClient, matches:match[] ) {
    console.log(matches.length);
    for(let i = 0; i < matches.length; i++) {
        const match = matches[i];
        console.log(match.teams.away.name, match.teams.home.name);
        await createMatch(prisma, match.fixture.id, match.teams.home.name, match.teams.away.name, getScore(match), new Date(match.fixture.date) );

    }
}

function getScore(match: match): string {
    if(match.score.fulltime.home == null) return "";
    return match.score.fulltime.home > match.score.fulltime.away ? "1" : (match.score.fulltime.home < match.score.fulltime.away ? "2" : "x");
}
