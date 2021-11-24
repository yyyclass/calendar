import type {NextApiRequest, NextApiResponse} from 'next'
import {mock} from 'mockjs';

interface Data {
    data: Task[]
}

interface Task {
    id: string;
    text: string;
    tab: string;
}

export default function handle(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const data = mock({
        "data|5": [{
            "id|3-5": /\d{5,10}\-/,
            "text": '@csentence(3, 5)',
            "tab|1": ["gray", "pink", "blue", "green", "yellow", "red"]
        }]
    })
    res.status(200).json(data)
}