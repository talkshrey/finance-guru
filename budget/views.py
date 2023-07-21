from django.shortcuts import render

from .models import Budget, BankAccount, Transaction
from .serializers import BudgetSerializer, BankAccountSerializer, TransactionSerializer
from django.http.response import HttpResponse, JsonResponse
from rest_framework import (mixins, generics, status, permissions)
# from .ocr import get_bill_details
from decimal import Decimal
from datetime import datetime as dt
# Create your views here.

class BankAccountAPI(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):

    serializer_class = BankAccountSerializer

    def get_queryset(self):
        return BankAccount.objects.filter(user=self.request.user)
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
    def post(self,request, *args, **kwargs):
        user = request.user
        try:
            bank_account = BankAccount.objects.create(
                user=user,
                account_type=request.data['account_type'],
                status=request.data['status'],
                branch=request.data['branch'],
                facility=request.data['facility'],
                currency=request.data['currency'],
                exchange_rate=request.data['exchange_rate'],
                balance=request.data['balance'],
                ifsc=request.data['ifsc'],
                od_limit=request.data['od_limit'],
                opening_date=request.data['opening_date'],
                drawing_limit=request.data['drawing_limit'],
                micr_code=request.data['micr_code'],
                masked_account_no=request.data['masked_account_no']
            )
            return JsonResponse({'message': 'Bank Account created successfully'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        
class TransactionAPI(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):

    serializer_class = TransactionSerializer

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
    def post(self,request, *args, **kwargs):
        print(request)
        user = request.user
        try:
            account = BankAccount.objects.get(id=request.data['account'], user=user)
            transaction = Transaction.objects.create(
                user=user,
                account=account,
                category=request.data['category'],
                transaction_type=request.data['transaction_type'],
                amount=Decimal(request.data['amount']),
                description=request.data['description'],
                narration=request.data['narration'],
                initial_balance=account.balance,
                mode=request.data['mode'],
                bill_img=request.FILES['bill_img']
            )
            return JsonResponse({'message': 'Transaction submitted successfully'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class BudgetAPI(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):

    serializer_class = BudgetSerializer

    def get_queryset(self):
        return Budget.objects.filter(user=self.request.user)
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
    def post(self,request, *args, **kwargs):
        user = request.user
        try:
            account = BankAccount.objects.get(pk=request.data['account'], user=user.pk)
            budget = Budget.objects.create(
                user=user,
                account=account,
                name=request.data['name'],
                start_date=request.data['start_date'],
                end_date=request.data['end_date'],
                limit=Decimal(request.data['limit']),
                description=request.data['description'],
                goal_amount=Decimal(request.data['goal_amount']),
                goal_img=request.FILES['goal_img'],
                recurrence=request.data['recurrence']
            )
            return JsonResponse({'message': 'Budget created successfully'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class BudgetUDAPI(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):

    serializer_class = BudgetSerializer
    queryset = Budget.objects.all()

    def get(self, request, *args, **kwargs):
        try:
            return self.retrieve(request, *args, **kwargs)
        except Exception as e:
            return JsonResponse({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, *args, **kwargs):
        try:
            return self.partial_update(request, *args, **kwargs)
        except Exception as e:
            return JsonResponse({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, *args, **kwargs):
        try:
            self.destroy(request, *args, **kwargs)
            return JsonResponse({'message': 'Budget deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return JsonResponse({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
# class OCRAPI(mixins.CreateModelMixin, generics.GenericAPIView):

#     serializer_class = OCRSerializer

#     def post(self,request, *args, **kwargs):
#         try:
#             ocr = OCR.objects.create(
#                 image=request.FILES['image']
#             )
#             reciever, bill_date, total_bill, category = get_bill_details(ocr.image.path)
#             print(reciever, bill_date, total_bill, category)
#             formatted_bill_date = dt.strptime(bill_date, '%d/%m/%Y').strftime('%Y-%m-%d')
#             return JsonResponse({"reciever": reciever, "bill_date":formatted_bill_date, "total_bill": float(total_bill), "category": category}, status=status.HTTP_201_CREATED)
#         except Exception as e:
#             return JsonResponse({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)