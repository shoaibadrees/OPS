
import { Injectable } from '@angular/core';
declare var $: any;
@Injectable()
export class NotificationService{

    success(message ){
        this.showNotification(message );
    }

    fail(message ){
        this.showNotification(message,'danger' );
    }

    info(message ){
        this.showNotification(message,'info' );
    }
    warning(message){
        this.showNotification(message,'warning');
    }

    showNotification(message ,message_type=null,from=null, align=null,icon=null){
        // from =['top','bottom']
         // align =['left','center','right']
        // const type = ['','info','success','warning','danger'];
      
        if(message_type ===null || message_type ===''){
            message_type = 'success';
        }

        if(from ==='' || from ===null){
            from = 'top';
        }

        if(align ===null || align ===''){
            align = 'right';
        }

        if(icon === null){
                    if(message_type == 'success'){
                        icon='done';
                    } else if(message_type == 'warning'){
                        icon= "warning";
                    } else if(message_type == 'info'){
                        icon= "info";
                    } else if(message_type == 'danger'){
                        icon= "notifications";
                    }
        }

        $.notify({
            icon: icon,
            message:message
  
        },{
            type: message_type,
            timer: 200,
            placement: {
                from: from,
                align: align
            },
            template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
              '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
              '<i class="material-icons" data-notify="icon">'+icon+'</i> ' +
              '<span data-notify="title">{1}</span> ' +
              '<span data-notify="message">{2}</span>' +
              '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
              '</div>' +
              '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
    }
    

}