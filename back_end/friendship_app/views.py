from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Follow
from .serializers import FollowSerializer
from user_app.models import User
from user_app.serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
# TODO: NEED TO ADD USER PERMISSIONS, TRY/EXCEPT, NO DUPLICATE FOLLOWING

# VIEW ALL USERS, VIEW ALL FOLLOWERS, VIEW ALL FOLLOWING, FOLLOW SOMEONE, UNFOLLOW SOMEONE, VIEW PLAN OF FOLLOWING(ON MEALPLAN VIEWS?)

class All_users(APIView):
    # GET ALL USERS FROM APP & RETURN 200, W/O AUTH
    def get(self, request):
        all_users = User.objects.all()
        return Response(
            UserSerializer(all_users, many = True).data,
            status = status.HTTP_200_OK)


class Specific_users(APIView):
    # GET SPECIFIC USER, W/O AUTH, RETURN 200
    def get(self, request, name):
        # FILTER SPECIFIC USER BASED ON NAME, ISTARTS WITH CHECKS CASE INSENSITIVITY
        specific_users = User.objects.filter(first_name__istartswith = name)
        return Response(UserSerializer(specific_users, many = True).data,
                        status = status.HTTP_200_OK)

# VIEW FOR USERS AS THE FOLLOWING
class Manage_follows(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    # GET EVERYONE USER IS FOLLOWING AND RETURN 200
    def get(self, request):
        # LIST OF USERS THE AUTH IS FOLLOWING THEN SERIALIZE DATA
        all_following = FollowSerializer(
            Follow.objects.filter(follower = request.user), many=True)
        return Response(all_following.data,
                        status = status.HTTP_200_OK)

    # FOLLOW A USER AND RETURN A STATUS 201 CREATED RELATIONSHIP
    def post(self, request, following_id):
        # GETTING
        following = User.objects.get(id=following_id)
        # CREATE FOLLOW RELATIONSHIP
        follow, created = Follow.objects.get_or_create(
            follower=request.user, following = following)
        return Response('Followed successfully',
                        status = status.HTTP_201_CREATED)

    # UNFOLLOW A USER AND RETURN A STATUS 204?

    def delete(self, request, following_id):
        # FIND THE ID OF USER TO UNFOLLOW FROM AUTH USER'S FOLLOWS
        follow = Follow.objects.filter(
            follower=request.user, following_id = following_id)
        # REMOVE THE FOLLOWED USER RELATIONSHIP
        follow.delete()
        return Response('Unfollowed successfully',
                        status = status.HTTP_204_NO_CONTENT
                        )


# VIEW FOR USER AS THE FOLLOWER
class Follower(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    # GET ALL OF A USER'S FOLLOWERS
    def get(self, request):
        # LIST OF USERS THAT ARE FOLLOWING THE AUTH USER
        all_followers = FollowSerializer(request.user.followers, many = True).data
        # TODO: FIX USING OTHER SERIALIZERS
        # all_followers = FollowSerializer(
        #     Follow.objects.filter(following = request.user), many= True).data
        return Response(all_followers, status = status.HTTP_200_OK)
        # return Response(all_followers.data,
        #                 status=status.HTTP_200_OK)
