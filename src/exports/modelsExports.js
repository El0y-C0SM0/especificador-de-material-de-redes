export { 
    Componente as ComponenteModel, 
    EquipamentoRack as EquipamentoRackModel,
    ComponenteRack as ComponenteRackModel, 
    Rack as RackModel
} from '../models/componente.js';

export {
    DistanciaInvalidaError,
    TamanhoRackInvalidoError
} from '../models/excecoes.js';

export * as TiposModels from '../models/tipos.js';

export { default as WorkspaceModel} from '../models/salas-deprecated/Workspace.js';
export { default as SEQModelDeprecated} from '../models/salas-deprecated/SEQ.js';
export { default as SalaTelecomModel} from '../models/salas-deprecated/SalaTelecom.js';

export { default as SEQPrimariaModel } from '../models/salas/backbonePrimario/SEQPrimaria.js';
export { default as SEQSecundariaModel } from '../models/salas/backbonePrimario/SEQSecundaria.js';

export { default as SEQModel } from '../models/salas/backboneSecundario/SEQ.js';
export { default as SETModel } from '../models/salas/backboneSecundario/SET.js';