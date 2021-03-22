from django.shortcuts import render
from rest_framework import generics
from django.http.response import JsonResponse
from .serializers import FileSerializer
from .models import Fileupload
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view


class FileView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        files = Fileupload.objects.all()
        serializer = FileSerializer(files, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        files_serializer = FileSerializer(data=request.data)
        if files_serializer.is_valid():
            files_serializer.save()
            return Response(files_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', files_serializer.errors)
            return Response(files_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
@api_view(['DELETE'])
def file_detail(request, pk):
    try: 
        files = Fileupload.objects.get(pk=pk) 
    except files.DoesNotExist: 
        return JsonResponse({'message': 'The tutorial does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    # if request.method == 'GET': 
    #     files_serializer = FileSerializer(files) 
    #     return JsonResponse(files_serializer.data) 
 
    if request.method == 'DELETE': 
        files.delete() 
        return JsonResponse({'message': 'Tutorial was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
       
    
