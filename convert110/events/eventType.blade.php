<h1>Event Types</h1>

@foreach($eventTypes as $eventType)
    <p>{{ $eventType->eventTypeName }}</p>
@endforeach