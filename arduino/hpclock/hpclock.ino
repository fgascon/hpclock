#include <AccelStepper.h>
#include <AFMotor.h>

// two stepper motors one on each port
AF_Stepper motor1(200, 1);
AF_Stepper motor2(200, 2);

// you can change these to DOUBLE or INTERLEAVE or MICROSTEP!
// wrappers for the first motor!
void forwardstep1(){  
  motor1.onestep(FORWARD, SINGLE);
}
void backwardstep1(){  
  motor1.onestep(BACKWARD, SINGLE);
}
// wrappers for the second motor!
void forwardstep2(){  
  motor2.onestep(FORWARD, SINGLE);
}
void backwardstep2(){  
  motor2.onestep(BACKWARD, SINGLE);
}

// Motor shield has two motor ports, now we'll wrap them in an AccelStepper object
AccelStepper stepper1(forwardstep1, backwardstep1);
AccelStepper stepper2(forwardstep2, backwardstep2);

int messageMotor = 0;
int messagePosition = 0;

void setup(){
    Serial.begin(9600);
    
    stepper1.setMaxSpeed(40.0);
    stepper1.setAcceleration(15.0);
    stepper1.runToNewPosition(0);
    
    stepper2.setMaxSpeed(40.0);
    stepper2.setAcceleration(15.0);
    stepper2.runToNewPosition(0);
}

void loop(){
  stepper1.run();
  stepper2.run();
  Serial.println("1:"+stepper1.currentPosition());
  Serial.println("2:"+stepper2.currentPosition());
  while(Serial.available()){
    if(messageMotor > 0){
      messagePosition = Serial.read();
      switch(messageMotor){
        case 1:
          stepper1.moveTo(messagePosition);
          break;
        case 2:
          stepper2.moveTo(messagePosition);
          break;
      }
    }else{
      messageMotor = Serial.read();
    }
  }
}

