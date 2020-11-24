#Dockerfile for building sample-bank-app for ansible

FROM node:10

MAINTAINER Nikhil Goenka "dynatraceone@dynatrace.com"

# Update aptitude with new repo
RUN apt-get update

# Install software
RUN apt-get install -y git

RUN git clone https://github.com/nikhilgoenkatech/SampleBankAppAnsible.git

WORKDIR SampleBankAppAnsible/
RUN npm install
EXPOSE 3000

CMD ["npm","start"]

