import { Response, Request, NextFunction } from 'express';
import { decodeJWToken } from '../../utils/decodeToken';
import { AuthService } from '../../services/Auth.service';

export class UserProfile {
  public updateUserProfile = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> => {
    const {
      body: { profile_image, telephone_no, location },
      headers: { authorization },
    } = req;
    const token = authorization.slice(7, authorization.length);
    const decodedToken = await decodeJWToken(token);
    const updatedUser = await AuthService.updateUserProfile(
      {
        location,
        profileImage: profile_image,
        telephoneNo: telephone_no,
      },
      decodedToken.id,
    );

    if (updatedUser) {
      return res.status(200).send({
        message: 'your profile was updated successfully',
        profile: updatedUser,
      });
    }
  };

  /**
   * getting particular user profiles from the db
   *
   */
  public getUserProfile = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> => {
    const { headers:{ authorization } } = req
    const token = authorization.slice(7, authorization.length);
    const decodedToken:any = await decodeJWToken(token);
    const userProfile = await AuthService.getUserProfile(decodedToken.id)
    return res.status(200).send({
      message:'fetching your users information',
      profileInfo: userProfile,
    })
  };
}
