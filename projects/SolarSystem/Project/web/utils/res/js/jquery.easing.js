/*
    liuqiang 2016/09/22 (thor.liu@outlook.com)

    扩展了以下缓动类型支持

    now

    sineEaseIn
    sineEaseOut
    sineEaseInOut

    quadEaseIn
    quadEaseOut
    quadEaseInOut

    cubicEaseIn
    cubicEaseOut
    cubicEaseInOut

    quartEaseIn
    quartEaseOut
    quartEaseInOut

    quintEaseIn
    quintEaseOut
    quintEaseInOut

    expoEaseIn
    expoEaseOut
    expoEaseInOut

    circEaseIn
    circEaseOut
    circEaseInOut

    backEaseIn
    backEaseOut
    backEaseInOut

    bounceTime
    bounceEaseIn
    bounceEaseOut
    bounceEaseInOut

    quadraticIn
    quadraticOut
    quadraticInOut
*/

jQuery.easing.now = function (p) { return 1; }

jQuery.easing.sineEaseIn = function(p)
{
     return -1 * Math.cos(p * Math.PI / 2) + 1;
};
jQuery.easing.sineEaseOut = function(p)
{
    return Math.sin(p * Math.PI / 2);
};
jQuery.easing.sineEaseInOut = function(p)
{
    return -0.5 * (Math.cos(Math.PI * p) - 1);
};



jQuery.easing.quadEaseIn = function(p)
{
    return p * p;
}  
jQuery.easing.quadEaseOut = function(p)
{
    return -1 * p * (p - 2);
}   
jQuery.easing.quadEaseInOut = function(p)
{
    p = p*2;
    if (p < 1)
        return 0.5 * p * p;
    --p;
    return -0.5 * (p * (p - 2) - 1);
}



jQuery.easing.cubicEaseIn = function(p)
{
    return p * p * p;
}
jQuery.easing.cubicEaseOut = function(p)
{
    p -= 1;
    return (p * p * p + 1);
}
jQuery.easing.cubicEaseInOut = function(p)
{
    p = p*2;
    if (p < 1)
        return 0.5 * p * p * p;
    p -= 2;
    return 0.5 * (p * p * p + 2);
}


jQuery.easing.quartEaseIn = function(p)
{
    return p * p * p * p;
}   
jQuery.easing.quartEaseOut = function(p)
{
    p -= 1;
    return -(p * p * p * p - 1);
}   
jQuery.easing.quartEaseInOut = function(p)
{
    p = p*2;
    if (p < 1)
        return 0.5 * p * p * p * p;
    p -= 2;
    return -0.5 * (p * p * p * p - 2);
}



jQuery.easing.quintEaseIn = function(p)
{
    return p * p * p * p * p;
}
    
jQuery.easing.quintEaseOut = function(p)
{
    p -=1;
    return (p * p * p * p * p + 1);
}
    
jQuery.easing.quintEaseInOut = function(p)
{
    p = p*2;
    if (p < 1)
        return 0.5 * p * p * p * p * p;
    p -= 2;
    return 0.5 * (p * p * p * p * p + 2);
}


jQuery.easing.expoEaseIn = function(p)
{
    return p == 0 ? 0 : Math.pow(2, 10 * (p/1 - 1)) - 1 * 0.001;
}
jQuery.easing.expoEaseOut = function(p)
{
    return p == 1 ? 1 : (-Math.pow(2, -10 * p / 1) + 1);
}
jQuery.easing.expoEaseInOut = function(p)
{
    p /= 0.5;
    if (p < 1)
    {
        p = 0.5 * Math.pow(2, 10 * (p - 1));
    }
    else
    {
        p = 0.5 * (-Math.pow(2, -10 * (p - 1)) + 2);
    }

    return p;
}


jQuery.easing.circEaseIn = function(p)
{
    return -1 * (Math.sqrt(1 - p * p) - 1);
}
jQuery.easing.circEaseOut = function(p)
{
    p = p - 1;
    return Math.sqrt(1 - p * p);
}
jQuery.easing.circEaseInOut = function(p)
{
    p = p * 2;
    if (p < 1)
        return -0.5 * (Math.sqrt(1 - p * p) - 1);
    p -= 2;
    return 0.5 * (Math.sqrt(1 - p * p) + 1);
}


jQuery.easing.backEaseIn = function(p)
{
    var overshoot = 1.70158;
    return p * p * ((overshoot + 1) * p - overshoot);
}
jQuery.easing.backEaseOut = function(p)
{
    var overshoot = 1.70158;

    p = p - 1;
    return p * p * ((overshoot + 1) * p + overshoot) + 1;
}
jQuery.easing.backEaseInOut = function(p)
{
    var overshoot = 1.70158 * 1.525;

    p = p * 2;
    if (p < 1)
    {
        return (p * p * ((overshoot + 1) * p - overshoot)) / 2;
    }
    else
    {
        p = p - 2;
        return (p * p * ((overshoot + 1) * p + overshoot)) / 2 + 1;
    }
}



jQuery.easing.bounceTime = function(p)
{
    if (p < 1 / 2.75)
    {
        return 7.5625 * p * p;
    }
    else if (p < 2 / 2.75)
    {
        p -= 1.5 / 2.75;
        return 7.5625 * p * p + 0.75;
    }
    else if(p < 2.5 / 2.75)
    {
        p -= 2.25 / 2.75;
        return 7.5625 * p * p + 0.9375;
    }

    p -= 2.625 / 2.75;
    return 7.5625 * p * p + 0.984375;
}


jQuery.easing.bounceEaseIn = function(p)
{
    return 1 - jQuery.easing.bounceTime(1 - p);
}

jQuery.easing.bounceEaseOut = function(p)
{
    return jQuery.easing.bounceTime(p);
}

jQuery.easing.bounceEaseInOut = function(p)
{
    var newT = 0;
    if (p < 0.5)
    {
        p = p * 2;
        newT = (1 - jQuery.easing.bounceTime(1 - p)) * 0.5;
    }
    else
    {
        newT = jQuery.easing.bounceTime(p * 2 - 1) * 0.5 + 0.5;
    }

    return newT;
}



jQuery.easing.quadraticIn = function(p)
{
    return  Math.pow(p,2);
}
    
jQuery.easing.quadraticOut = function(p)
{
    return -p*(p-2);
}
    
jQuery.easing.quadraticInOut = function(p)
{   
    var resultTime = p;
    p = p*2;
    if (p < 1)
    {
        resultTime = p * p * 0.5;
    }
    else
    {
        --p;
        resultTime = -0.5 * (p * (p - 2) - 1);
    }
    return resultTime;
}