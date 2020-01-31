import { Pipe, PipeTransform } from '@angular/core';
import { Project } from 'src/app/Model/Project';


@Pipe({
    name: 'filter',
})
export class FilterPipe implements PipeTransform {
 
    transform( projects: any[],SearchValue?:string): any[] {
   
 if(!projects) 
    {
       return [];
    }

    
   
    if (SearchValue !=undefined  &&  SearchValue!=null && SearchValue )
    {
        SearchValue = SearchValue.toLocaleLowerCase();
        projects = projects.filter(proj =>  proj.ProjectName !==undefined && proj.ProjectName.toLocaleLowerCase().includes(SearchValue));
    }
    
   return projects;
    }
}