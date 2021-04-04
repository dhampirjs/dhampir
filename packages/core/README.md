# Dhampir Core

Javascript library that includes features needed for building Web applications. Such as Enhanced Routing, Extensibility, Appearance, Storage

## Enhanced Routing Feature

Introduces several new concept such as Root Routing, Descendant Routing, Routing Area, Area Rendering.

***Root Route*** is a *Routing Rule* that describes top level of the route, literally route that is a first part of the `path`.

***Descendant Route*** is a Routing Rule that is a child of Root Route or another *Descendant Route*. Path of the child route will be included in resulting route url.
For example if *Root Route* path is `/store`, and it has Descendant Route path `/checkout` then resulting path is `/store/checkout`

***Routing Area*** is a box or container where *Area Renderings*, that are associated with this *Area* and current location are rendered.

***Area Rendering*** is a part of the *Routing Rule* that contains identifier or name of the *Area* and function or component that *Routing Feature* will render to that Area.

## Extensibility

In progress.

## Appearance

This feature allows user to do the following:
* register custom *Color Themes*;
* develop custom components that use *Color Theme*;
* use additional API to work with *Themes*;

## Storage
Allows user to configure which data storage to use. *Dhampir Core* supports Redux and React Query OOTB.

## Feature Toggling
In progress.

