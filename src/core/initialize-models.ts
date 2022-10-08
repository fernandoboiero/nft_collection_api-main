import {getModelForClass} from "@typegoose/typegoose"
import {MCollection} from "../entities/collection"
import {Layer} from "../entities/layer"
import {Image} from "../entities/image"

export const CollectionModel = getModelForClass(MCollection)
export const LayerModel = getModelForClass(Layer)
export const ImageModel = getModelForClass(Image)
