import userModel from "../models/user.model";
import { ErrorMessage, ErrorResponse, IUser, IUserResponse } from "../types/user.type";
import express from 'express';

const defaultUserResponse: IUserResponse = {
  success: true,
  data: [],
  error: null,
  message: 'Ok'
}

const defaultErrorResponse: ErrorResponse = {
  success: false,
  data: null,
  error: null,
  message: 'Internal server error'
}

const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users: IUser[] = await userModel.find({});
    if (users) {
      const userResponse: IUserResponse = { ...defaultUserResponse, success: true, data: users }
      return res.status(200).send(userResponse);
    } else {
      const userResponse: ErrorResponse = { ...defaultErrorResponse, message: ErrorMessage.RESOURCE_FORBIDDEN }
      return res.status(403).send(userResponse);
    }
  } catch (error) {
    const errorResponse: ErrorResponse = { ...defaultErrorResponse, error: error };
    return res.status(500).send(errorResponse); 
  }
}

const createUser = async (req: express.Request, res: express.Response) => {
    try {
        const user: IUser | null = await userModel.findOne({email: req.body.email})
        if(user) {
          const errorResponse: ErrorResponse = { ...defaultErrorResponse, message: ErrorMessage.RESOURCE_EXISTS}
          return res.status(400).send(errorResponse);
        } else {
          const newUser = await userModel.create(req.body);
          if(newUser) {
            return res.status(200).send({success: true, message: ErrorMessage.RESOURCE_CREATED, data: newUser});
          } else {
            const userResponse: ErrorResponse = { ...defaultErrorResponse, message: ErrorMessage.RESOURCE_FORBIDDEN }
            return res.status(403).send(userResponse);
          }
        }
    } catch (error) {
        return res.status(500).json({success: false, message: error, data: null})
    }

}

const updateUser = async (req: express.Request, res: express.Response) => {

    try {
        const user: IUser | null = await userModel.findOne({email: req.body.email});
        if(!user) {
          return res.status(404).send({success: false, message: ErrorMessage.RESOURCE_NOTE_FOUND, data: null});
        } else {
          console.log('==> updateUser req.body', req.body);
          // const payload: IUser = req.body;
          const {_id, payload} = req.body;
          const updatedUser = await userModel.findOneAndUpdate({email: req.body.email}, payload, {upsert: false, new: true})
          if(updatedUser) {
            return res.status(200).send({success: true, message: ErrorMessage.RESOURCE_UPDATED, data: updatedUser})
          } else {
            const userResponse: ErrorResponse = { ...defaultErrorResponse, message: ErrorMessage.RESOURCE_FORBIDDEN }
            return res.status(403).send(userResponse);
          }
        }
    } catch (error) {
        return res.status(500).send({success: false, message: error, data: null})
    }
}

const deleteUser = async (req: express.Request, res: express.Response) => {

  try {
    const deletedUser: IUser | null = await userModel.findOneAndDelete({_id: req.params.id});
    if (deletedUser) {
      const userResponse: IUserResponse = { ...defaultUserResponse, success: true, data: null, message: ErrorMessage.RESOURCE_DELETED }
      return res.status(200).send(userResponse);
    } else {
      const userResponse: ErrorResponse = { ...defaultErrorResponse, message: ErrorMessage.RESOURCE_FORBIDDEN }
      return res.status(403).send(userResponse);
    }
  } catch (error) {
    const errorResponse: ErrorResponse = { ...defaultErrorResponse, error: error };
    return res.status(500).send(errorResponse); 
  }

}

const getUserById = async (req: express.Request, res: express.Response) => {

  try {
    const user: IUser | null = await userModel.findById(req.params.id)
    if (user) {
      const userResponse: IUserResponse = { ...defaultUserResponse, success: true, data: Array.of(user) }
      return res.status(200).send(userResponse);
    } else {
      const userResponse: ErrorResponse = { ...defaultErrorResponse, message: ErrorMessage.RESOURCE_FORBIDDEN }
      return res.status(403).send(userResponse);
    }
  } catch (error) {
    const errorResponse: ErrorResponse = { ...defaultErrorResponse, error: error };
    return res.status(500).send(errorResponse); 
  }

}

export { getAllUsers, createUser, updateUser, deleteUser, getUserById };