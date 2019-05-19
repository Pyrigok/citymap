from django.http import HttpResponse, JsonResponse
from django.views.generic import View

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from places.api.serializers import HotelSerializer, CommentSerializer, CafeSerializer, HotelAdditionSerializer
from places.models import Hotel, Comment, Cafe


class HotelApi(generics.ListCreateAPIView):
    """API to get hotels and save comments"""
    queryset = Hotel.get_all_hotels()
    serializer_class = HotelSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        self.save_comment(request.data)

        return HttpResponse("OK")

    def save_comment(self, data):

        try:
            hotel = Hotel().get_object_by_name(data['hotel'])
            comment = Comment(hotel = hotel, author = data['author'], text = data['text'])
            comment.save()
        except Exception as exc:
            print("save_comment EXCEPTION: ", repr(exc))


class GetHotelComments(View):
    """API to get comments from db and pass them to frontend"""

    def get(self, request, pk):
        selected_hotel = Hotel().get_object_by_pk(pk = pk)
        comments = Comment().get_objects_by_hotel(selected_hotel = selected_hotel)
        comments_serializer = CommentSerializer(comments, many = True)

        return JsonResponse(comments_serializer.data, safe = False)


class GetCafeComments(View):
    """API to get comments from db and pass them to frontend"""

    def get(self, request, pk):
        selected_cafe = Cafe().get_object_by_pk(pk = pk)
        comments = Comment().get_objects_by_cafe(selected_cafe = selected_cafe)
        comments_serializer = CommentSerializer(comments, many = True)

        return JsonResponse(comments_serializer.data, safe = False)


class CafeApi(generics.ListCreateAPIView):
    """API to get Cafes from db and pass to frontend"""
    queryset = Cafe().get_all_cafes()
    serializer_class = CafeSerializer

    def post(self, request):
        self.save_comment(request.data)

        return HttpResponse("ok")

    def save_comment(self, data):

        try:
            cafe = Cafe().get_cafe_by_name(data['cafe'])
            comment = Comment(cafe = cafe, author = data['author'], text = data['text'])
            comment.save()
        except Exception as exc:
            print("save_comment EXCEPTION: ", repr(exc))


class HotelAdditionAPI(generics.ListCreateAPIView):
    """API endpoint for listing and creating Hotel objects."""
    queryset = Hotel().get_all_hotels()
    serializer_class = HotelAdditionSerializer

    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = HotelAdditionSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)
