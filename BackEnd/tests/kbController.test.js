const request = require('supertest');
import app from '../index.js';
import mongoose from 'mongoose';
import Crop from '../models/cropModel.js';
import CropDisease from '../models/diseaseModel.js';
import dotenv from 'dotenv';
import findConfig from 'find-config';
import { ObjectId } from 'mongoose';

dotenv.config({ path: findConfig('.env') });


