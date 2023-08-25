# Project 1: Shared shopping list

A first course project for course Web Software Development in Aalto University.

Fly.io address: https://morning-butterfly-333.fly.dev/

# Shared shopping list

## Description & instructions
Application where users can create shopping lists and interact with them.
Start creating shopping lists by navigating to path /lists.
Create a list by writing a name for the list inside Name field and click "Create new list".
You should now see your created lists listed on the page.

You can open the list by clicking it's name and deactivate it by clicking "Deactivate!"

When you open your list you can start adding items to it.
Write a name of the to the "item name" field and click "Add item" to add it.
You should now see your items listed below. You can mark items collected by clicking "Mark collected" below every item.

## Online deployment
Online deployment is at:
https://morning-butterfly-333.fly.dev/

## Guilelines for running locally
You can run the application locally by navigating to ./shopping-lists folder with terminal and running "docker-compose up" command.
The application will then be displayed locally with address: http://localhost:7777/

To run local automated End-to-End tests first run command "docker-compose down".
Then run command "docker-compose run --entrypoint=npx e2e-playwright playwright test && docker-compose rm -sf".
