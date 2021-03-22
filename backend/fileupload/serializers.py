from rest_framework import serializers
from .models import Fileupload

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fileupload
        fields = '__all__'
