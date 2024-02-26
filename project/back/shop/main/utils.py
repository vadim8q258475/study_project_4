from random import *


def key_maker(string):  # на вход подается строка с поиска а возвращается список ключей в нижнем регистре
    lst = []
    new_str = ''
    for s in string:
        num = ord(s)
        if (97 <= num <= 122) or (1072 <= num <= 1103) or (65 <= num <= 90) or (1040 <= num <= 1071) or num == 32:
            new_str += s
    new_lst = new_str.lower().split()
    fin_lst = []
    for key in new_lst:
        if key not in fin_lst:
            fin_lst.append(key)
    return fin_lst


def search_function(keys_string, queryset):
    if len(keys_string) == 0:
        return queryset
    search_key_list = key_maker(keys_string)
    dct = {}
    for obj in queryset:
        obj_key_list = key_maker(obj.name)
        collection = obj.collection.name.lower()
        type = obj.type.name.split()
        if collection not in obj_key_list:
            obj_key_list.append(collection)
        for i in type:
            if i.lower() not in obj_key_list:
                obj_key_list.append(i.lower())
        num = 0
        for key in obj_key_list:
            if key in search_key_list:
                num += 1
        if num > 0:
            dct[obj] = num
    fin_lst = []
    for i in range(len(dct)):
        num = 0
        obj = None
        for k in dct:
            if dct[k] > num:
                num = dct[k]
                obj = k
        dct.pop(obj)
        fin_lst.append(obj)
    return fin_lst


def price_sort(queryset, reverse=False):
    new_query = sorted(queryset, key = lambda x: x.price_with_sale, reverse=reverse)
    return new_query


def name_sort(queryset, reverse=False):
    new_query = sorted(queryset, key = lambda x: x.name, reverse=reverse)
    return new_query


def sale_func(queryset, sale):
    if sale == 'false':
        return queryset
    lst = []
    for i in queryset:
        if i.sale != 0:
            lst.append(i)
    return lst


def sort_func(queryset, type):
    if type == '0':
        return queryset
    dct = {
        '1': None,
        '2': None,
        '3': price_sort(queryset, reverse=False),
        '4': price_sort(queryset, reverse=True),
        '5': name_sort(queryset, reverse=False),
        '6': name_sort(queryset, reverse=True)
    }
    return dct[type]


def price_min_max(query, min, max):
    new_query = []
    for prod in query:
        if int(min) <= prod.price_with_sale <= int(max):
            new_query.append(prod)
    return new_query


def random_str(str_len):
    s = ''
    for i in range(str_len):
        num = randint(0, 9)
        s += str(num)
    return s


def email_validator(email):
    if email[0] == '@':
        return False
    if '@' not in email:
        return False
    email_name_lst = ['gmail', 'yandex', 'mail']
    domen_lst = ['ru', 'com']
    flag = False
    flag2 = False
    domen = ''
    email_name = ''
    for i in range(len(email)):
        s = email[i]
        if flag:
            if s == '.':
                flag = False
                flag2 = True
            else:
                email_name += s
        elif s == '@':
            flag = True
        if flag2 and s != '.':
            domen += s
    if domen in domen_lst and email_name in email_name_lst:
        return True
    else:
        return False


def recalc_func(total, cert, promo):
    total = int(total)
    cert = int(cert)
    promo = int(promo)

    total = total - ((total / 100) * promo)
    total -= cert
    if total < 0:
        cert = abs(total)
        total = 0
    elif total > 0:
        cert = 0
    else:
        cert = 0
    return {'certificate': cert, 'total': total} #cert это остаток номинала сертификата




