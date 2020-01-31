import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/Model/User';


@Pipe({
    name: 'Userfilter',
})
export class UserFilterPipe implements PipeTransform {
 
    transform( users: any[],SearchValue?:string ): any[] {
   
 if(!users) 
    {
       return [];
    }

    
    if (SearchValue !=undefined  &&  SearchValue!=null && SearchValue )
    {
        SearchValue = SearchValue.toLocaleLowerCase();
        users = users.filter(user =>  user.FirstName !==undefined && user.FirstName.toLocaleLowerCase().includes(SearchValue));
    }

  

   return users;
    }
}