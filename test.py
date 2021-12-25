dominoes = [[1,2],[1,2],[1,1],[1,2],[2,2]]
count = 0
for i in range(len(dominoes)-1):
	if (dominoes[i][0:2] == dominoes[i+1][::-1]) or (( dominoes[i][0] == dominoes[i+1][1]) and ( dominoes[i+1][0] == dominoes[i][1])):
		count = count+1
        
print(count)