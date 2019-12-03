function solution(n){
    var answer = '';
    var arr = ['4','2','1']
    var leaved = 0
    while(n > 0){
        leaved = n%3;
        n = parseInt(n/3);
        if(leaved === 0){
            n = n-1;
            answer = arr[leaved] + answer;
        }
    }
}

