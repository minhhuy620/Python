def input_data():
    num_array = []
    num_input = input("Enter elements:")
    print('Enter numbers in array: ')
    for i in range(int(num_input)):
        n = int(input("num :"))
        num_array.append(n)
    return num_array


def check_data():
    arr = input_data()
    sums = 0
    kq = 0
    count = 0
    try:
        if len(arr) <= 1:
            return 0
        else:
            for i in range(len(arr) - 1):
                if len(arr) == 2:
                    if arr[i] < arr[i + 1]:
                        sums = arr[i + 1] - arr[i]
                        return sums
                    else:
                        return 0
                else:
                    if arr[i] == arr[i + 1]:
                        i += 1
                        count += 1
                        continue
                    if arr[i] > arr[i + 1]:
                        i += 1
                        continue
                    if arr[i] < arr[i + 1]:
                        if max(arr[0:i + 1]) == arr[i + 1]:
                            if count > 0:
                                kq = (arr[i + 1] - arr[i]) * (count + 1)
                            else:
                                kq = max(arr[0:i]) * len(arr[slice(arr.index(max(arr[0:i])) + 1, i + 1)]) - sum(
                                    arr[slice(arr.index(max(arr[0:i])) + 1, i + 1)])
                        elif max(arr[0:i + 1]) > arr[i + 1]:
                            if count > 0:
                                kq = (arr[i + 1] - arr[i]) * (count + 1)
                            else:
                                kq = arr[i + 1] * len(arr[slice(arr.index(max(arr[0:i + 1])) + 1, i + 1)]) - sum(
                                    arr[slice(arr.index(max(arr[0:i + 1])) + 1, i + 1)])
                        elif max(arr[0:i + 1]) < arr[i + 1]:
                            if count > 0:
                                kq = (max(arr[0:i]) - arr[i]) * (count + 1)
                            else:
                                kq = max(arr[0:i + 1]) * len(arr[slice(arr.index(max(arr[0:i + 1])), i + 1)]) - sum(
                                    arr[slice(arr.index(max(arr[0:i + 1])), i + 1)])
            sums += kq
    except:
        print("Error")
    return sums


print("Ket qua: ", check_data())
