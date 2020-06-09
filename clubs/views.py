# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated


from .models import Club
from .serializers import ClubSerializer, PopulatedClubSerializer

class ClubListView(APIView):

    permission_classes = (IsAuthenticated,)

    # def is_club_member(self, club, user):
    #     if club.members.id != user.id:
    #         raise PermissionDenied

#? gets clubs only when user is member
    def get(self, request):
        user = self.request.user
        clubs = Club.objects.filter(members=user)
        serialized_clubs = PopulatedClubSerializer(clubs, many=True)
        return Response(serialized_clubs.data, status=status.HTTP_200_OK)

    def post(self, request):
        new_club = ClubSerializer(data=request.data)
        if new_club.is_valid():
            new_club.save()
            return Response(new_club.data, status=status.HTTP_201_CREATED)
        return Response(new_club.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class ClubDetailView(APIView):

    permission_classes = (IsAuthenticated,)

#? gets single club only when user is member
    def get_club(self, pk):
        user = self.request.user
        try:
            return Club.objects.filter(members=user).get(pk=pk)
        except Club.DoesNotExist:
            raise NotFound()
    
    def get(self, _request, pk):
        club = self.get_club(pk)
        serialized_club = PopulatedClubSerializer(club)
        return Response(serialized_club.data)

    def put(self, request, pk):
        club_to_update = self.get_club(pk)
        updated_club = ClubSerializer(club_to_update, data=request.data)
        if updated_club.is_valid():
            updated_club.save()
            return Response(updated_club.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_club.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, _request, pk):
        club_to_delete = self.get_club(pk)
        club_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)