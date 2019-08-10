import { Pipe, PipeTransform } from '@angular/core'
import sort from 'fast-sort'

@Pipe({
    name: 'order',
})

export class OrderPipe implements PipeTransform {
    transform(items: any, orderBy: number) {
        console.log(orderBy)
        if(orderBy == 2){
            return sort(items).asc(item => item.age)
        } else if(orderBy == 1){
            return sort(items).asc(item => item.name)
        }
        return items
    }
}