import {Injectable} from "@nestjs/common";
import {Course} from "../../../../shared/course";
import { Model } from 'mongoose';
import {InjectModel} from "@nestjs/mongoose";

@Injectable()
export class CoursesRepository {

  constructor(@InjectModel('Course') private courseModel: Model<Course>) {

  }

  async findAll(): Promise<Course[]> {
      return this.courseModel.find();
  }

  updateCourse(courseId: string, changes: Partial<Course>): Promise<Course> {
    return this.courseModel.findOneAndUpdate(
      {_id: courseId},
      changes,
      {new: true}
      )
  }

  deleteCourse(courseId: string) {
    return this.courseModel.deleteOne({_id: courseId})
  }

  async addCourse(course: Partial<Course>): Promise<Course> {

    // this.courseModel.create(course); // tak to jde taky
    const newCourse = this.courseModel(course);

    await newCourse.save();

    return newCourse.toObject({versionKey:false});

  }
}
