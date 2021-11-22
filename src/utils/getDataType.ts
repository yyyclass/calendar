export default function getDataType(data: any): undefined | string {
    return Object.prototype.toString.call(data).match(/(?<=\s)\w+(?=])/g)?.[0].toLowerCase();
}