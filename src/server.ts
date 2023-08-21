import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import Papa from 'papaparse';
import { createMember, createTeam, addTeamToMember, syncMatches } from './util/prismaHelpers';

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());
app.use(cors());

// Define a type for the request body in the /add-member endpoint
interface AddMemberRequestBody {
    name: string;
    email?: string; // I noticed email was destructured but not used in your original JS code. I've marked it as optional here.
}

// Endpoint to add a member
app.post('/add-member', async (req: Request<{}, {}, AddMemberRequestBody>, res: Response) => {
    const { name } = req.body;
    try {
        const member = await createMember(prisma, name);
        res.json(member);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

// Endpoint to get all members
app.get('/members', async (req: Request, res: Response) => {
    try {
        const members = await prisma.member.findMany();
        res.json(members);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});


const upload = multer({ storage: multer.memoryStorage() });

app.get('/member-teams/:memberId', async (req: Request<{ memberId: string }>, res: Response) => {
    const { memberId } = req.params;
    try {
        const member = await prisma.member.findUnique({
            where: { id: Number(memberId) },
            include: {
                FootballTeamMember: {
                    include: {
                        footballTeam: true
                    }
                }
            }
        });

        res.json(member);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/fixtures', async (req: Request, res: Response) => {
    var myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", "f3fea99c1cd57d2b16fa4f0a74ab1ff7");
    myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: "follow" as RequestRedirect,
    }; 

    fetch("https://v3.football.api-sports.io/fixtures?league=39&season=2023", requestOptions)
        .then(response => response.text())
        .then(result => {console.log('test'); return result})
        .then(result => syncMatches( prisma, JSON.parse(result)["response"] as match[]) )
        .catch(error => console.log('error', error));
}
)


// Endpoint for file upload
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const fileBuffer = req.file.buffer;  // This is a Buffer containing the uploaded file data.

    // Process the file buffer as needed. For example:
    const fileContent = fileBuffer.toString('utf8');  // Convert the file content to a string if it's a text file.

    // Parse the content
    Papa.parse(fileContent, {
        header: false,  // Note this is set to false
        skipEmptyLines: true,
        complete: async (results) => {
            if (results.errors.length) {
                return res.status(400).send({ errors: results.errors });
            }

            const membersAndTeams = results.data;

            // Now, iterate over each row and handle members and teams
            membersAndTeams.forEach(async (row: any) => {
                const member: string = row[0];
                const team1: string = row[1];
                const team2: string = row[2];
                const memberObject = await createMember(prisma, member);
                await createTeam(prisma, team1);
                await createTeam(prisma, team2);
                await addTeamToMember(prisma, memberObject.id, team1);
                await addTeamToMember(prisma, memberObject.id, team2);
                console.log(`Processed ${member}, ${team1}, ${team2}`);
            });

            res.status(200).send({ message: "Processed successfully!" });
            console.log('Processed successfully!')
            return;
        }
    });
    return;
});




const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


