const NO_OF_FRAMES = 20;
const fun = (arr, flag) => {
    const size = arr.length;
    if(size < 25)
        return 0;
    let i = size;
    let beta = arr[i-1];
    let countb = beta.length;
    let leftfinal=0, rightfinal=0, upfinal=0, downfinal=0;
    if(flag==0)
    {
        let openfps = 20;
        let openfingers = arr[i-openfps].length;
        if(openfingers <=1 )
        {
            if(countb >= 4)
            {
                console.log("open");
                flag = time;
                return 5;
            }
        }
        if(openfingers >= 4)
        {
            if(countb <= 1)
            {
                console.log("close");
                flag = time;
                return 6;
            }
        }
        for(let haha = 2; haha < 20; haha++)
        {
            let alpha = arr[i-haha];
            let counta = alpha.length;
            if(Math.abs(counta-countb)<=1 && counta>=3 && countb>=3)
            {
            // let right=0,left=0,up=0,down=0,value=50;
            // for(let index = 0; index<Math.min(counta, countb); index++)
            // {
            //   if(Math.abs(alpha[index]['y'] - beta[index]['y'])> value)
            //   {
            //     if(alpha[index]['y'] - beta[index]['y'] > 0)
            //     {
            //       up++;
            //     }
            //     else
            //     {
            //       down++;
            //     }
            //   }
            //   if(Math.abs(alpha[index]['x'] - beta[index]['x'])> value)
            //   {
            //     if(alpha[index]['x'] - beta[index]['x'] > 0)
            //     {
            //       right++;
            //     }
            //     else
            //     {
            //       left++;
            //     }
            //   }
            // }
            // if(Math.abs(counta-up)<=1)
            //   console.log("up");
            // if(Math.abs(counta-down)<=1)
            //   console.log("down");
            // if(Math.abs(counta-left)<=1)
            //   console.log("left");
            // if(Math.abs(counta-right)<=1)
            //   console.log("right");
            let alphah = 0, alphav=0, betah=0, betav=0, valueh=15, valuev=15;
            for(let index=0; index<counta; index++)
            {
                alphah += alpha[index]['x'];
                alphav += alpha[index]['y'];
            }
            for(let index=0; index<countb; index++)
            {
                betah += beta[index]['x'];
                betav += beta[index]['y'];
            }
            alphah/=counta, alphav/=counta, betah/=countb, betav/=countb;
            if(alphah - betah >= valueh)
            {
                leftfinal++;
                //console.log("left");
            }
            if(betah - alphah >= valueh)
            {
                rightfinal++;
                //console.log("right");
            }
            if(alphav - betav >= valuev)
            {
                downfinal++;
                //console.log("down");
            }
            if(betav - alphav >= valuev)
            {
                upfinal++;
                //console.log("up");
            }
            }
            
        }
    }
    else
        flag--;
    console.log(leftfinal, rightfinal, upfinal, downfinal);
    //console.log("whatthe");
    let cnt = 12,time=20;
    if(leftfinal >=cnt)
    {
        console.log("left");
        flag=time;
        return 1;
    }
    if(rightfinal >=cnt)
    {
        console.log("right");
        flag=time;
        return 2;
    }
    if(upfinal >=cnt)
    {
        console.log("up");
        flag=time;
        return 3;
    }
    if(downfinal >=cnt)
    {
        console.log("down");
        flag=time;
        return 4;
    }
    return 0;
}