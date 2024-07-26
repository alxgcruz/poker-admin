import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

    labels = {
        buttons: {
            save: 'Guardar',
            cancel: 'Cancelar',
            confirm: 'Confirmar',
            export: 'Exportar',
            new: 'Nuevo',
            delete: 'Eliminar',
            no: 'No',
            yes: 'Si',
            activate: 'Activar',
            scan: 'Escanear',
            add: 'Agregar'
        },
        messages: {
            delete: '¿Está seguro de eliminar el registro?',
        }
    };

}
