export function enumToArray<T>(enumme: any): T[] {

    return Object.keys(enumme).map(key => enumme[key] )

}
