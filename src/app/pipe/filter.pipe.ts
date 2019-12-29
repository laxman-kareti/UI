import { Pipe, PipeTransform } from '@angular/core';
import { Task } from 'src/app/Model/task';


@Pipe({
    name: 'filter',
})
export class FilterPipe implements PipeTransform {
 
    transform( tasks: any[],nameSearch?:string, parentSearch?:string,
    fromSearch?:number,toSearch?:number,sdateSearch?:Date,edateSearch?:Date ): any[] {
   
 if(!tasks) 
    {
       return [];
    }

    
    if (nameSearch !=undefined  &&  nameSearch!=null && nameSearch )
    {
        nameSearch = nameSearch.toLocaleLowerCase();
        tasks = tasks.filter(task =>  task.TaskName !==undefined && task.TaskName.toLocaleLowerCase().includes(nameSearch));
    }

    if  ( parentSearch != undefined && parentSearch )
    {
        parentSearch = parentSearch.toLocaleLowerCase();
        tasks = tasks.filter(task =>  (task.ParentTask != undefined) && task.ParentTask.toLocaleLowerCase().includes(parentSearch));
      }

      
       
    if  ( fromSearch != undefined && toSearch !=undefined && fromSearch && toSearch )
    {
       tasks = tasks.filter(task => task.Priority >= fromSearch && 
        task.Priority <= toSearch );
      
    }

    if  ( sdateSearch != undefined  && sdateSearch )


    {
      
        tasks = tasks.filter( task => 
            new Date(sdateSearch).toDateString() == new Date(task.StartDate).toDateString());
       }

    if  ( edateSearch != undefined  && edateSearch )
    {
       tasks = tasks.filter( task => 
            new Date(edateSearch).toDateString() == new Date(task.EndDate).toDateString());
 }
    if  ( sdateSearch != undefined && edateSearch !=undefined && sdateSearch && edateSearch )
    {
       tasks = tasks.filter(
             task => new Date(sdateSearch) == new Date(task.StartDate) &&
         new Date(task.edateSearch) == new Date(task.EndDate));
      
    }
   return tasks;
    }
}