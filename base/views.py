from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from agora_token_builder import RtcTokenBuilder
import random
import time
# Create your views here.

def getToken(request):
    appId='6b2d0d61dfae4697942732d1252a9823'
    appCertificate='7b02cff9667a43f3a5c8e1af1ecc33ca'
    channelName=request.GET.get('channel')
    uid=random.randint(1,230)
    expirationTimeInSeconds=3600*24
    currentTimeStamp=time.time()
    role=1
    privilegeExpiredTs=currentTimeStamp + expirationTimeInSeconds
    token = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs)
    return JsonResponse({'token':token,'uid':uid},safe=False)

def home(request):
    return render(request,'base/home.html')


def room(request):
    return render(request,'base/room.html')