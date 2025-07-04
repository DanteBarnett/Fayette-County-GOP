from django.conf import settings

def analytics(request):
    return {"GA_ID": getattr(settings, "GA_ID", "")}