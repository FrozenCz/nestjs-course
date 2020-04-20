import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters
} from "@nestjs/common";
import {Course} from "../../../../shared/course";
import {CoursesRepository} from "../repositories/courses.repository";
import {HttpExceptionFilter} from "../../filters/http.filter";

@Controller("courses")
export class CoursesController {

  constructor(private coursesDB: CoursesRepository) {
  }

  @Get()
  async findAllCourses(): Promise<Course[]> {
    return this.coursesDB.findAll()
  }

  @Put(':courseId')
  async updateCourse(
    @Param("courseId") courseId:string,
    @Body() changes: Partial<Course>): Promise<Course> {

    if(changes._id) {
      throw new BadRequestException("Can't update course id");
    }

    return this.coursesDB.updateCourse(courseId, changes);

  }

  @Delete(":courseId")
  async deleteCourse(@Param("courseId") courseId: string) {

    return this.coursesDB.deleteCourse(courseId)

  }

  @Post()
  async createCourse(@Body() course: Partial<Course>): Promise<Course>{
    return this.coursesDB.addCourse(course);
  }

}
