# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated


from .models import Request
from .serializers import RequestSerializer, PopulatedRequestSerializer

class RequestListView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = self.request.user
        requests = Request.objects.filter(recipient=user)
        serialized_requests = PopulatedRequestSerializer(requests, many=True)
        return Response(serialized_requests.data, status=status.HTTP_200_OK)

    def post(self, request):
        new_request = RequestSerializer(data=request.data)
        if new_request.is_valid():
            new_request.save()
            return Response(new_request.data, status=status.HTTP_201_CREATED)
        return Response(new_request.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class RequestDetailView(APIView):

    permission_classes = (IsAuthenticated,)

    def get_request(self, pk):
        try:
            return Request.objects.get(pk=pk)
        except Request.DoesNotExist:
            raise NotFound()

    def get(self, _request, pk):
        request = self.get_request(pk)
        serialized_request = PopulatedRequestSerializer(request)
        return Response(serialized_request.data)

    def delete(self, request, pk):
        request_to_delete = self.get_request(pk)
        request_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)