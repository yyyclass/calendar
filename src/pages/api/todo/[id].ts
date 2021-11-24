import type {NextApiRequest, NextApiResponse} from 'next';
import {mock} from 'mockjs';
function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = mock({
        "content|1-10": mock('@cparagraph()')
    })
    res.status(200).send(data)
}


export default handler;